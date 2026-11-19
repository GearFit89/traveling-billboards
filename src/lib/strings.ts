export function capitalizeFirstLetter(string:string){
    return string.charAt(0).toUpperCase()+ string.slice(1, )
}
export function safeToString(value: any): string {
    if (value === null || value === undefined) {
        return '';
    }
    if (typeof value === 'object') {
        try {
            return JSON.stringify(value);
        } catch {
            return String(value);
        }
    }
    return String(value);
}