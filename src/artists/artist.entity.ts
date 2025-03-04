import { Song } from "src/songs/song.entity";
import { User } from "src/users/user.entity";
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity('artist')
export class Artist {

    @PrimaryGeneratedColumn()
    id: number;


    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @ManyToMany(()=> Song, (song)=>song.artists)
    @JoinColumn()
    songs: Song[]
    

}
