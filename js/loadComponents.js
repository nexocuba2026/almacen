export async function cargarComponentes(){

const header = await fetch("components/header.html")
const headerHTML = await header.text()

document.getElementById("header").innerHTML = headerHTML


const footer = await fetch("components/footer.html")
const footerHTML = await footer.text()

document.getElementById("footer").innerHTML = footerHTML

}