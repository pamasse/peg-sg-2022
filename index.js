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
    console.log(step)
    var arr = [];
    for (var i=start; i<stop; i+=step){
       arr.push(i);
    }
    return arr;
};

const generate_graph = result => {
    const vlSpec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        data: {
            values: result
        },
        mark: {"type": "line", "tooltip": true},
        with: 1000,
        height: 500,
        encoding: {
            x: {field: '5ans', type: 'quantitative', title: "SAINT-GOBAIN RELAIS 2022 5 ANS"},
            y: {field: 'abondement', type: 'quantitative'}
        }
    };

    // Embed the visualization in the container with id `vis`
    vegaEmbed('#vis', vlSpec);
    return true
}

const generate_value = (participation) => {
    let result = []
    let maxAbondement = 0
    let a5 = 0
    let a10 = 0
    let abondement = 0;
    participation = parseFloat(participation.replace(/\s/g, '')) 
    for (let pourcentage of range(0, 100, 0.1)) {
        abondement = classique_5ans(participation * (pourcentage/100))
        abondement += classique_10ans(participation * ((100 - pourcentage)/100))
        result.push({
            "5ans": participation * (pourcentage/100),
            "10ans": participation * ((100 - pourcentage)/100),
            "abondement": abondement
        })

        if (abondement > maxAbondement) {
            maxAbondement = Math.round(abondement)
            a5 = Math.round(participation * (pourcentage/100))
            a10 = Math.round(participation * ((100 - pourcentage)/100))
        }

    }

    generate_graph(result)
    return [true, maxAbondement, a5, a10]
}
