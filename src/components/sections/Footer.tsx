export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            @compright, {currentYear}
        </footer>
    )
}