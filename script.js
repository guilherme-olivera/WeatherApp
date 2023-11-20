// Função para definir o fundo do corpo da página com uma imagem
function setBodyBackground(imageUrl) {
  document.body.style.backgroundImage = `url(${imageUrl})`;
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}

function getWeather() {
  const openWeatherApiKey = "1466f97ee70590a7699b4b063627278f";
  const unsplashApiKey = "RlEAnYY_8mRWvB_xiloLsXAfSyCvmCnf-zqxTirkrRo";
  const city = document.getElementById("city").value;
  const openWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric&lang=pt`;

  // Chama a API do OpenWeatherMap para obter dados meteorológicos
  fetch(openWeatherApiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);

      // Se a busca for bem-sucedida, chama a API do Unsplash com base na descrição da condição
      const conditionDescription = data.weather[0].description;
      const unsplashApiUrl = `https://api.unsplash.com/photos/random?query=${conditionDescription}&client_id=${unsplashApiKey}`;

      // Chama a API do Unsplash e verifica o status antes de processar os dados
      fetch(unsplashApiUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            // Se o status não for 200, permanece a imagem padrão
            throw new Error(
              `Erro na resposta da API do Unsplash. Status: ${response.status}`
            );
          }
        })
        .then((unsplashData) => {
          // Atualiza o fundo do corpo da página com a imagem do Unsplash
          setBodyBackground(unsplashData.urls.full);
        })
        .catch((error) => {
          console.error(
            "Erro ao obter imagem do Unsplash. Usando imagem padrão:",
            error.message
          );
          // Em caso de erro, configura a imagem padrão
          setDefaultBackground();
        });
    })
    .catch((error) => {
      console.error("Erro ao obter dados meteorológicos:", error);
    });
}

// Função para exibir informações meteorológicas
function displayWeather(data) {
  const weatherInfo = document.getElementById("weather-info");
  weatherInfo.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>Temperatura: ${data.main.temp}°C</p>
          <p>Condição: ${data.weather[0].description}</p>
          <p>Umidade: ${data.main.humidity}%</p>
          <p>Pressão: ${data.main.pressure} hPa</p>
          <p>Velocidade do Vento: ${data.wind.speed} m/s</p>
          <p>Direção do Vento: ${data.wind.deg}°</p>
      `;
}

// Função para trocar a imagem de fundo quando estiver pronta
function changeBackground() {
  // Chama a função getWeather novamente para obter uma nova imagem
  getWeather();
}

// Função para definir a imagem padrão
function setDefaultBackground() {
  const defaultImageUrl = "./nasa.jpg"; // Substitua com a URL da sua imagem padrão
  document.body.style.backgroundImage = `url(${defaultImageUrl})`;
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}

// Chama a função para definir a imagem padrão inicialmente
setDefaultBackground();
