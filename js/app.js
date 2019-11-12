// @ts-check

(function() {
	const sidebar = document.getElementById("sidebar")
	const map = document.getElementById("map")
	const links = map.querySelectorAll("svg a")

	Array.from(links).map(link => {
		link.addEventListener("click", (event) => {
			const path = link.querySelector("path")

			const countryName = path.getAttribute("name")
			const countryCode = path.getAttribute("id")

			removeAllChildren(sidebar)
			sidebar.append(createLoadingIndicator())

			// TODO: Show Loading Animation
			// TODO: Make API Call to OECD
			// TODO: Render Data
			// TODO: Add rendered Data to Sidebar
		})
	})

	function removeAllChildren(node) {
        while (sidebar.firstElementChild !== null) {
			sidebar.firstElementChild.remove()
		}
	}

	function createLoadingIndicator() {
		let loader = document.createElement("div")
		loader.classList.add("loadingIndicator")

		return loader
	}

})()