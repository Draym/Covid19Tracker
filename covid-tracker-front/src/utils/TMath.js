class TPrettyNbr {
    static fbackIncPercent(nbr, percent) {
        return (nbr - (nbr * 100 / (100 + percent)));
    }
}

export default TPrettyNbr;