const classique_5ans = x => {
    aide = 0
    if (x >= 100) {
        aide += 100
        if (x >= 2000) {
            aide += 0.45 * (2000 - 100)
            if (x >= 5700) {
                aide += 0.20 * (5700 - 2000)
                if (x >= 10000) {
                    aide += 0.1 * (10000 - 5700)
                } else {
                    aide += 0.1 * (x - 5700)
                } 
            } else {
                aide += 0.20 * (x - 2000)
            } 
        } else {
            aide += 0.45 * (x - 100) 
        } 
    } else {
        aide = x
    }
    return aide
}

const classique_10ans = x => {
    aide = 0
    if (x >= 1500) {
        aide += 0.7 * 1500
        if (x >= 3000) {
            aide += 0.5 * (3000-1500)
        } else {
            aide += 0.5 * (x - 1500)
        }
    } else {
        aide += 0.7 * x
    }
    return aide
}

const range = function(start, stop, step){
    step = step || 1;
    var arr = [];
    for (var i=start;i<stop;i+=step){
       arr.push(i);
    }
    return arr;
};

const generate_value = x => {
    let abondement = 0;
    for (pourcentage in range(0, 100, 0.1)) {
        abondement = classique_5ans(participation * (pourcentage/100))
        abondement += classique_10ans(participation * ((100 - pourcentage)/100))
        result.append({
            "5ans": pourcentage,
            "10ans": 100 - pourcentage,
            "abondement": abondement
        })
        }
}

console.log(range(0, 100, 0.1))