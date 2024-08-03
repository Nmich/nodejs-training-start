import { z } from 'zod'

export const searchResponseSchema = z.object({
    totalResults: z.string(),
    Response: z.enum(['True', 'False']),
    Search: z.array(z.object({
        Title: z.string(),
        Year: z.string(),
        imdbID: z.string(),
        Type: z.string(),
        Poster: z.string(),
    }))
})

export type SearchResponse = z.infer<typeof searchResponseSchema>

export const mediaSchema = z.object({
    Title: z.string(),
    Year: z.string(),
    Rated: z.string(),
    Released: z.string(),
    Runtime: z.string(),
    Genre: z.string(),
    Director: z.string(),
    Writer: z.string(),
    Actors: z.string(),
    Plot: z.string(),
    Language: z.string(),
    Country: z.string(),
    Awards: z.string(),
    Poster: z.string(),
    Ratings: z.array(z.object({
        Source: z.enum(['Internet Movie Database','Rotten Tomatoes', 'Metacritic']),
        Value: z.string(),
    })),
    Metascore: z.string(),
    imdbRating: z.string(),
    imdbVotes: z.string(),
    imdbID: z.string(),
    Type: z.string(),
    DVD: z.string(),
    BoxOffice: z.string(),
    Production: z.string(),
    Website: z.string(),
    Response: z.string(),
})

export type Media = z.infer<typeof mediaSchema>



