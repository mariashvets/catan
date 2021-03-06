define([], function() {
    var Const = {
        HEX_COUNT: 19,
        HEX_SEA_COUNT: 18,
        HEX_EDGE_SIZE: 85,
        HEX_EDGE_COLS: 5,
        CROSSROAD_COUNT: 53,
        CROSSROAD_HEIGHT: 60,
        ROAD_HEIGHT: 15,
        VICTORY_POINTS_FOR_WIN: 5,
        HEX_TYPE_WHEAT: "wheat",
        HEX_TYPE_SHEEP: "sheep",
        HEX_TYPE_WOOD: "tree",
        HEX_TYPE_ROCK: "rock",
        HEX_TYPE_BRICK: "brick",
        HEX_TYPE_DESERT: "desert",
        HEX_TYPE_SEA: "sea",
        THIEF_WIDTH: 70,
        THIEF_HEIGHT: 95,
        resourcesTypes: ["wheat", "sheep", "tree", "rock", "brick"],
        VALUES_OF_DICE: [1, 2, 3, 4, 5, 6],
        HARBOR_TYPES: ["tree", "wheat", "rock", "brick", "sheep", "general-harbor", "general-harbor", "general-harbor", "general-harbor"],
        neighborCoords: [
            {q: -1, r: 0},
            {q: 0, r: -1},
            {q: 1, r: -1},
            {q: 1, r: 0},
            {q: 0, r: 1},
            {q: -1, r: 1}
        ],
        crossroadsCoords: [
            {q: -1 / 3, r: -1 / 3},
            {q: 1 / 3, r: -2 / 3},
            {q: 2 / 3, r: -1 / 3},
            {q: 1 / 3, r: 1 / 3},
            {q: -1 / 3, r: 2 / 3},
            {q: -2 / 3, r: 1 / 3}

        ],
        staticCoords: [
            {q: 0, r: -2},
            {q: 1, r: -2},
            {q: 2, r: -2},
            {q: 2, r: -1},
            {q: 2, r: 0},
            {q: 1, r: 1},
            {q: 0, r: 2},
            {q: -1, r: 2},
            {q: -2, r: 2},
            {q: -2, r: 1},
            {q: -2, r: 0},
            {q: -1, r: -1},
            {q: 0, r: -1},
            {q: 1, r: -1},
            {q: 1, r: 0},
            {q: 0, r: 1},
            {q: -1, r: 1},
            {q: -1, r: 0},
            {q: 0, r: 0}
        ],
        coordsForSeaHexes: [
            {q: 0, r: -3},
            {q: 1, r: -3},
            {q: 2, r: -3},
            {q: 3, r: -3},
            {q: 3, r: -2},
            {q: 3, r: -1},
            {q: 3, r: 0},
            {q: 2, r: 1},
            {q: 1, r: 2},
            {q: 0, r: 3},
            {q: -1, r: 3},
            {q: -2, r: 3},
            {q: -3, r: 3},
            {q: -3, r: 2},
            {q: -3, r: 1},
            {q: -3, r: 0},
            {q: -2, r: -1},
            {q: -1, r: -2}
        ],
        coordsOfHarbor: [
            {q: 0, r: -2, indexOfCrossroad: 0},
            {q: 1, r: -2, indexOfCrossroad: 1},
            {q: 2, r: -1, indexOfCrossroad: 1},
            {q: 2, r: 0, indexOfCrossroad: 2},
            {q: 0, r: 2, indexOfCrossroad: 2},
            {q: -1, r: 2, indexOfCrossroad: 3},
            {q: -2, r: 2, indexOfCrossroad: 4},
            {q: -2, r: 1, indexOfCrossroad: 5},
            {q: -1, r: -1, indexOfCrossroad: 5}
        ],
        getQRByXY: function(x, y) {
            if (typeof x === 'object') {
                y = x.y;
                x = x.x;
            }

            var coords = {r: 0, q: 0};

            // Adjust for field centering.
            x = x - (Const.FIELD_WIDTH / 2);
            y = y - (Const.FIELD_HEIGHT / 2);

            // Adjust for field centering.
            //x = x + (Const.HEX_WIDTH/2);
            //y = y + (Const.HEX_HEIGHT/2);

            coords.q = x * 2 / 3 / Const.HEX_EDGE_SIZE;
            coords.r = (-x / 3 + Math.sqrt(3) / 3 * y) / Const.HEX_EDGE_SIZE;

            coords.q = Math.round(coords.q);
            coords.r = Math.round(coords.r);

            return coords;
        },
        getXYByQR: function(q, r) {
            if (typeof q === 'object') {
                r = q.r;
                q = q.q;
            }

            var coords = {x: 0, y: 0};

            // See flat top axis coords formula at: http://www.redblobgames.com/grids/hexagons/#hex-to-pixel
            coords.x = Const.HEX_EDGE_SIZE * 3 / 2 * q;
            coords.y = Const.HEX_EDGE_SIZE * Math.sqrt(3) * (r + q / 2);

            // Adjust for field centering.
            coords.x = coords.x + (Const.FIELD_WIDTH / 2);
            coords.y = coords.y + (Const.FIELD_HEIGHT / 2);

            // Adjust for hex centering.
            coords.x = coords.x - (Const.HEX_WIDTH / 2);
            coords.y = coords.y - (Const.HEX_HEIGHT / 2);

            coords.x = Math.round(coords.x);
            coords.y = Math.round(coords.y);

            return coords;
        },
        rules: "«Колонизаторы» (The Settlers of Catan) игра Клауса Тойбера, " +
        "выпущенная в 1995 году. Эта классическая семейная игра очень известна и " +
        "популярна во всем мире по сей день, несмотря на достаточно большой возраст. " +
        "Она собрала множество наград, и к ней выпущено много дополнений, расширений и самостоятельных игр в той же тематике. " +
        "В «Колонизаторах» три  игрока выступают в роли отважных поселенцев, которые обживают свой новый дом – остров Катан. " +
        "Игрокам придется строить дороги, поселения и города, собирать ресурсы, торговать и переживать набеги разбойников."
    };
    Const.HEX_WIDTH = Const.HEX_EDGE_SIZE * 2;
    Const.HEX_HEIGHT = Math.sqrt(Math.pow(Const.HEX_EDGE_SIZE, 2) - Math.pow(Const.HEX_EDGE_SIZE / 2, 2)) * 2;
    Const.FIELD_WIDTH = Const.HEX_EDGE_COLS * Const.HEX_EDGE_SIZE + (Const.HEX_EDGE_COLS + 1) * Const.HEX_EDGE_SIZE / 2; // 120
    Const.FIELD_HEIGHT = Const.HEX_HEIGHT * Const.HEX_EDGE_COLS;
    return Const;
});
