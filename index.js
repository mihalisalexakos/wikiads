
// mihalis alexakos 3200003
// stefanos dimitrakopoulos 3130054


document.addEventListener("DOMContentLoaded", function () {
    // Fetch JSON data from the website


        fetch('https://wiki-ads.onrender.com/categories')
            .then(response => response.json())
            .then(data => {


                console.log(data);
                var rawTemplate = document.getElementById("categories-template").innerHTML;
                var compiledTemplate = Handlebars.compile(rawTemplate);

                // Render the template with the data and append to the container
                var ourGeneratedHTML = compiledTemplate({ categories: data });
                var categContainer = document.getElementById("categ-container");
                categContainer.innerHTML = ourGeneratedHTML;
            })
            .catch(error => console.error('Error fetching JSON:', error));

        
        fetch(`https://wiki-ads.onrender.com/categories/1/subcategories`)

            .then(response => response.json())
            .then(data => {


                console.log(data);
                var rawTemplate = document.getElementById("subcateg-template-1").innerHTML;
                var compiledTemplate = Handlebars.compile(rawTemplate);

                // Render the template with the data and append to the container
                var ourGeneratedHTML = compiledTemplate({ categories: data });
                var categContainer = document.getElementById("subcateg-container-1");
                categContainer.innerHTML = ourGeneratedHTML;
            })
            .catch(error => console.error('Error fetching JSON:', error));

        fetch(`https://wiki-ads.onrender.com/categories/2/subcategories`)

            .then(response => response.json())
            .then(data => {


                console.log(data);
                var rawTemplate = document.getElementById("subcateg-template-2").innerHTML;
                var compiledTemplate = Handlebars.compile(rawTemplate);

                // Render the template with the data and append to the container
                var ourGeneratedHTML = compiledTemplate({ categories: data });
                var categContainer = document.getElementById("subcateg-container-2");
                categContainer.innerHTML = ourGeneratedHTML;
            })
            .catch(error => console.error('Error fetching JSON:', error));



        fetch(`https://wiki-ads.onrender.com/categories/3/subcategories`)

            .then(response => response.json())
            .then(data => {


                console.log(data);
                var rawTemplate = document.getElementById("subcateg-template-3").innerHTML;
                var compiledTemplate = Handlebars.compile(rawTemplate);

                // Render the template with the data and append to the container
                var ourGeneratedHTML = compiledTemplate({ categories: data });
                var categContainer = document.getElementById("subcateg-container-3");
                categContainer.innerHTML = ourGeneratedHTML;
            })
            .catch(error => console.error('Error fetching JSON:', error));



        fetch(`https://wiki-ads.onrender.com/categories/4/subcategories`)

            .then(response => response.json())
            .then(data => {


                console.log(data);
                var rawTemplate = document.getElementById("subcateg-template-4").innerHTML;
                var compiledTemplate = Handlebars.compile(rawTemplate);

                // Render the template with the data and append to the container
                var ourGeneratedHTML = compiledTemplate({ categories: data });
                var categContainer = document.getElementById("subcateg-container-4");
                categContainer.innerHTML = ourGeneratedHTML;
            })
            .catch(error => console.error('Error fetching JSON:', error));
    


});
