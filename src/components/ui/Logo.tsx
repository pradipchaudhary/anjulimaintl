import Image from "next/image";

export default function Logo() {
    return (
        <Image
            aria-hidden
            src="/anjulimalogo.webp"
            alt="File icon"
            width={216}
            height={216}
        />
    )
}