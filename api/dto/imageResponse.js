module.exports = class ImageResponse{

    constructor(id, title, description, date, path, size) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.path = path;
        this.size = size;
    }
}