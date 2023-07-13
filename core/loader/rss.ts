import type { Loader } from '../index.js'
import { findLink } from './utils.js'

export const rss: Loader = {
  getMineLinksFromText(text) {
    let links = findLink(text, 'application/rss+xml')
    if (links.length > 0) {
      return links
    } else if (findLink(text, 'application/atom+xml').length === 0) {
      let { origin } = new URL(text.url)
      return [new URL('/feed', origin).href, new URL('/rss', origin).href]
    } else {
      return []
    }
  },

  async getPosts() {
    return []
  },

  isMineText(text) {
    let document = text.parse()
    if (document.firstChild?.nodeName === 'rss') {
      return document.querySelector('channel > title')?.textContent ?? ''
    } else {
      return false
    }
  },

  isMineUrl() {
    return undefined
  }
}