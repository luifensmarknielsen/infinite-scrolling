// var intObs = new IntersectionObserver(callback, options);
// var counter = 0;

// var options = {
//     threshold: [1]
// }

// function callback(entries) {
//     // console.log(entries[0])
//     intObs.unobserve(entries[0].target);
//     get10();
// }


// function get10() {
//     fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=" + counter).then(function (response) {
//         return response.json()
//     }).then(function (data) {
//         // console.log(data.results)
//         data.results.forEach(function (result) {
//             // console.log(result.name)

//             var p = document.createElement("p")
//             p.innerText = result.name
//             document.querySelector(".pokelist").appendChild(p);
//         })

//         var lastChild = document.querySelector(".pokelist p:last-child")
//         intObs.observe(lastChild)
//         counter = counter + 10;
//         // console.log(lastChild)
//     });
// }
// get10();

//offset starter med at være nul

var offset = 0;
var count;

function getImage(url) {
    return fetch(url).then(function (response) {
        return response.json()
    }).then(function (data) {
        return data.sprites.front_default
    })
}


function getThePokemons(offset) {


    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`, {
            method: "GET",
            Headers: {
                "Accept": "application/JSON;"
            },
        })
        // .then(Response => Response.json())
        // .then(data => console.log(data))
        // .catch(err => console.log(err))
        .then(function (Response) {
            return Response.json();
        })

        .then(function (data) {
            var template = document.getElementById("template");
            var ul = document.querySelector(".pokeList");

            // console.log(data.count);
            count = data.count;

            data.results.forEach(function (results) {
                console.log(results);
                var clone = template.content.cloneNode(true);

                clone.querySelector(".name").innerText = results.name;

                var image = clone.querySelector(".placeholderImage")

                getImage(results.url).then(function (imageURL){
                    image.dataset.src = imageURL
                    imageObserver.observe(image);
                })

                ul.appendChild(clone);
            });

            var lastChild = document.querySelector(".pokeList li:last-child");

            observer.observe(lastChild);
        });

}

var observer = new IntersectionObserver(function (entries) {
    if (entries[0].intersectionRatio <= 0) return;
    // console.log(entries[0]);
    observer.unobserve(entries[0].target);
    offset = offset + 10;
    if (offset > count) return;
    getThePokemons(offset);
}, {
    threshold: 1
});

var imageObserver = new IntersectionObserver(function(entries){
    if (entries[0].intersectionRatio <= 0) return;

    observer.unobserve(entries[0].target);
    entries[0].target.src = entries[0].target.dataset.src;
}, {
    threshold: 1
})


// getThePokemons(offset);
getThePokemons(0);