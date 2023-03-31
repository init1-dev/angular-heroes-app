export interface Heroe {
    id?:              string;
    superhero:        string;
    publisher:        Publisher;
    alter_ego:        string;
    first_appearance: string;
    characters:       string;
    alt_img?:         string;
}

export enum Publisher {
    None = "None",
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}