export type Video = {
    id: string;
    title: string;
    numLikes: number;
    filePath: string;
    description: string;
    thumbnail: string;
    createAt: string;
    user: User;
    category: Category;
    videoTags: VideoTag[];
    comments: Comment[];

}

export type Comment = {
    id: string;
    text: string;
    user: User;
    createAt: string;
    updateAt: string;
    deleteAt: null | string;
}

export type User = {
    id: string;
    email: string;
    image: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}

export type Category = {
    id: string;
    name: string;
}

export type Link = {
    text: string;
    href: string;
}

export type Tag = {
    id: string;
    name: string;
    checked?: boolean;
}

export type VideoTag = {
    id: string;
    video: Video;
    tag: Tag;
}

// export type Session = {
//     user: {
//         id: string;
//         email: string;
//         token: string;
//         role: string;
//         username: string;
//     }
// }

declare module "next-auth" {
    interface Session {
        user: {
            email: string;
            token: string;
            id: string;
            role: string;
            image: string;
            username: string;
        }
    }
}

export type Like = {
    id: string;
    createAt: string;
    updateAt: string;
    user: User;
    video: Video;
}

export type Playlist = {
    id: string;
    name: string;
    createAt: string;
    user: User;
}

export type PlaylistVideo = {
    id: string;
    createAt: string;
    video: Video;
}