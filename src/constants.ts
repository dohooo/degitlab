import { join } from 'path'
import homeOrTemp from 'home-or-tmp'

export const base = join(homeOrTemp, '.degitlab')
