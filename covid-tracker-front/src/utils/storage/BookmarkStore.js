import ContextStorage from "./ContextStorage";
import EStorageKey from "../enum/EStorageKey";

/*
** Store object
* state : string
* country : string
 */
class BookmarkStore {

    static bookmarkAreEquals(b1, b2) {
        return (b1 && b2 && b1.state === b2.state && b1.country === b2.country);
    }

    static getBookmarks() {
        let bookmarks = ContextStorage.GET(EStorageKey.BOOKMARKS);
        if (bookmarks != null) {
            return JSON.parse(bookmarks);
        }
    }

    static hasBookmark(location) {
        if (location == null)
            return false;
        let bookmarks = this.getBookmarks();
        if (bookmarks) {
            for (let i in bookmarks) {
                if (this.bookmarkAreEquals(bookmarks[i], location)) {
                    return true;
                }
            }
        }
        return false;
    }

    static deleteBookmark(location) {
        if (location == null)
            return null;
        let bookmarks = this.getBookmarks();
        if (bookmarks == null) {
            return;
        }
        bookmarks = bookmarks.filter(e => e.state != null && e.country != null && !this.bookmarkAreEquals(e, location));
        this.save(bookmarks);
    }

    static addBookmark(location) {
        if (location == null)
            return null;
        let bookmarks = this.getBookmarks();
        if (bookmarks == null) {
            bookmarks = [];
        }
        bookmarks.push(location);
        this.save(bookmarks);
    }

    static clear() {
        ContextStorage.CLEAR(EStorageKey.BOOKMARKS);
    }

    static save(bookmarks) {
        ContextStorage.SET(EStorageKey.BOOKMARKS, JSON.stringify(bookmarks));
    }
}

export default BookmarkStore;
