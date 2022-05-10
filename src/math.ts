export function normal() {
    // Box-Muller random normal
    const u = Math.random()
    const v = Math.random()
    return Math.sqrt(
        -2 * Math.log(u) * Math.cos(2 * Math.PI * v))
}