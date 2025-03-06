import { EntityManager } from "typeorm";
import * as bcrypt from "bcrypt"
import { User } from "src/users/user.entity";
import { faker } from "@faker-js/faker";
import { v4 as uuid4 } from "uuid"
import { Artist } from "src/artists/artist.entity";
import { Playlist } from "src/playlists/playlist.entity";

export const seedData = async(manager: EntityManager): Promise<void> => {

    await seedUser();
    await seedArtist();
    await seedPlaylist();

    async function seedUser() {
        const salt = await bcrypt.genSalt()
        const encryptedPassword = await bcrypt.hash('123456', salt);

        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        user.apiKey = uuid4()

        await manager.getRepository(User).save(user);
    }

    async function seedArtist() {
        const salt = await bcrypt.genSalt()
        const encryptedPassword = await bcrypt.hash('123456', salt);

        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        user.apiKey = uuid4()

        const artist = new Artist();
        artist.user = user;

        await manager.getRepository(User).save(user);
        await manager.getRepository(Artist).save(artist)
    }

    async function seedPlaylist() {
        const salt = await bcrypt.genSalt()
        const encryptedPassword = await bcrypt.hash('123456', salt);

        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        user.apiKey = uuid4()

        const playList = new Playlist();
        playList.name = faker.music.genre();
        playList.user = user;

        await manager.getRepository(User).save(user);
        await manager.getRepository(Playlist).save(playList)
    }

}