import { fetchPhotos } from "../../answers/Challenge2"

describe('Challenge 2: fetch photos', () => {
  beforeAll(() => {
    // mock global fetch
    const mockedResponse = {
      ok: true,
      status: 200,
      statusText: 'success',
    }

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ...mockedResponse,
      json: () => Promise.resolve(
        {
            "albumId": 1,
            "id": 1,
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            "url": "https://via.placeholder.com/600/92c952",
            "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        },
      ),
    } as Response).mockResolvedValueOnce({
      ...mockedResponse,
      json: () => Promise.resolve(
        {
          "albumId": 1,
          "id": 2,
          "title": "reprehenderit est deserunt velit ipsam",
          "url": "https://via.placeholder.com/600/771796",
          "thumbnailUrl": "https://via.placeholder.com/150/771796"
        }
      ),
    } as Response).mockResolvedValueOnce(({
      ok: false,
      status: 404,
      statusText: 'fails',
    }) as Response)
  })

  afterAll(() => {
    // restore fetch function
    jest.restoreAllMocks()
  })

  it('should enable to fetch urls', async () => {
    const result = await fetchPhotos()
    
    expect(result.length).toBe(3)
    expect(result[0]).toEqual(
      expect.objectContaining({
        id: 1,
        title: "accusamus beatae ad facilis cum similique qui sunt",
        url: "https://via.placeholder.com/600/92c952", 
      })
    )
    expect(result[1]).toEqual(
      expect.objectContaining({
        id: 2,
        title: "reprehenderit est deserunt velit ipsam",
        url: "https://via.placeholder.com/600/771796",
      })
    )

    expect(result[2]).toBe(null)
  })
})