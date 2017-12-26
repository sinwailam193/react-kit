export function deleteCookie(cookeName, validDomain) {
    const domanStr = validDomain ? `; domain=${validDomain}` : "";
    document.cookie = `${cookeName}=; max-age=0; path=/${domanStr}`;
}
