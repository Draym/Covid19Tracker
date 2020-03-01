class TPrettyNbr {
    static pretify(nbr, sign) {
        if (nbr === undefined || nbr == null) {
            return null;
        }
        nbr = nbr | 0;
        return (sign && nbr > 0 ? "+": "") + nbr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    static pretifyFloat(nbr, size, sign) {
        if (nbr === undefined || nbr == null) {
            return null;
        }
        var parts = nbr.toFixed(size).toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return (sign && nbr > 0 ? "+": "") + parts.join(".");
    }
}

export default TPrettyNbr;