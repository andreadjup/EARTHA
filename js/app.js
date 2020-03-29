// @ts-check

;(function() {
	const sidebar = document.getElementById("sidebar")
	const map = document.getElementById("map")
	const links = map.querySelectorAll("svg a")

	Array.from(links).map((link) => {
		link.addEventListener("click", async (event) => {
			const path = link.querySelector("path")

			const countryName = path.getAttribute("name")
			const countryCode = path.getAttribute("id")

			removeAllChildren(sidebar)
			sidebar.append(renderLoadingIndicator())

			let data

			await Promise.all([
				new Promise((resolve) => {
					setTimeout(() => {
						resolve()
					}, 500)
				}),

				new Promise(async (resolve) => {
					let response = await fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`, {
						method: "GET",
					})

					data = await response.json()

					resolve()
				})
			])

			removeAllChildren(sidebar)
			sidebar.append(renderCountryData(data))

			// TODO: Add rendered Data to Sidebar
		})
	})

	function removeAllChildren(node) {
		while (sidebar.firstElementChild !== null) {
			sidebar.firstElementChild.remove()
		}
	}

	function renderLoadingIndicator() {
		let loader = document.createElement("div")
		loader.classList.add("loadingIndicator")

		return loader
	}

	function renderCountryData(data) {
		function tableRow(name, value) {
			return `<tr><td>${name}</td><td>${value}</td></tr>`
		}

		let dataContainer = document.createElement("div")
		dataContainer.classList.add("dataContainer")

		dataContainer.innerHTML = `
			<h1>${data.name}<img class="flag" src="${data.flag}"></h1>
			<table class="countryData">
				<tbody>
					${tableRow("Capital", data.capital)}
					${tableRow("Population", data.population)}
					${tableRow(data.currencies.length > 1 ? "Currencies" : "Currency", data.currencies.map(currency => `${currency.name} (${currency.symbol})`).join(", "))}
					${tableRow(data.languages.length > 1 ? "Languages" : "Language", data.languages.map(language => `${language.name}`).join(", "))}
					${tableRow(data.borders.length > 1 ? "Borders" : "Border", data.borders.map(border => `${border}`).join(", "))}
					${tableRow("Area", data.area)}
					${tableRow("Alpha-2 code", data.alpha2Code)}
					${tableRow("Alpha-3 code", data.alpha3Code)}
					</tbody>
			</table>
		`

		return dataContainer
	}
})()

