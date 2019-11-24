export default class Raytracer {
    render(image: ImageData) {
        image.data[0] = 255
        image.data[3] = 255
    }
}