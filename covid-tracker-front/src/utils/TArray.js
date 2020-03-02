import TObject from "./TObject";

class TArray {
    static isEqual(a1, a2) {
        if (a1.length !== a2.length) {
            return false;
        }
        for (let i in a1) {
            if (!TObject.isEqual(a1[i], a2[i])) {
                return false;
            }
        }
        return true;
    }
}

export default TArray;
