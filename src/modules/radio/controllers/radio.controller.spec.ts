// ponytail: write minimal integration tests for genre and artist radio routes
import { RadioController } from '#modules/radio/controllers'
import { FeaturedRadioStationModel } from '#modules/radio/models'
import { SongModel } from '#modules/songs/models'
import { beforeAll, describe, expect, it } from 'vitest'
import type { z } from 'zod'

describe('RadioController', () => {
  let radioController: RadioController

  beforeAll(() => {
    radioController = new RadioController()
    radioController.initRoutes()
  })

  it('get featured radio stations', async () => {
    const response = await radioController.controller.request('/radio?language=english')
    const { success, data } = (await response.json()) as {
      success: boolean
      data: z.infer<typeof FeaturedRadioStationModel>[]
    }

    expect(success).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    expect(() => FeaturedRadioStationModel.parse(data[0])).not.toThrow()
  })

  it('get genre radio songs', async () => {
    const response = await radioController.controller.request('/radio/genre/Chill?limit=2')
    const { success, data } = (await response.json()) as { success: boolean; data: z.infer<typeof SongModel>[] }

    expect(success).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    expect(() => SongModel.parse(data[0])).not.toThrow()
  })

  it('get artist radio songs', async () => {
    const response = await radioController.controller.request('/radio/artist/Околиця/16894547?limit=2')
    const { success, data } = (await response.json()) as { success: boolean; data: z.infer<typeof SongModel>[] }

    expect(success).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    expect(() => SongModel.parse(data[0])).not.toThrow()
  })
})
