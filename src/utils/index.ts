export function startsWithHash(s: string): boolean {
    return s.startsWith('#');
}

export function isJSON(str: string): boolean {
    try {
        const parsedJSON = JSON.parse(str);
        if (typeof parsedJSON === 'object' && parsedJSON !== null) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}
