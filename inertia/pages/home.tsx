import { useEffect, useRef, type MouseEvent, type ReactNode, type RefObject } from 'react'
import { AuthLayout } from '#ui/components/Layout'
import { type InferPageProps } from '@adonisjs/inertia/types'
import type InstagramController from '../../app/auth/instagram/instagram_controller'
import { css } from '#style/css'
import { Link } from '@inertiajs/react'

type IgMediaCarousel = {
  data: {
    id: string
    is_comment_enabled: boolean
    media_product_type: 'FEED' | 'AD' | 'STORY' | 'REELS'
    media_type: 'CAROUSEL_ALBUM'
    media_url: string
    permalink: string
    shortcode: string
    timestamp: string
    username: string
    children: {
      data: Array<
        | {
            id: string
            media_type: 'IMAGE'
            media_url: string
          }
        | {
            thumbnail_url: string
            media_type: 'VIDEO'
            id: string
          }
      >
    }
  }
}

const Home = ({ medias }: InferPageProps<InstagramController, 'getMedia'>) => {
  return (
    <>
      <h1 className={css({ marginTop: '3.5' })}>Vos publications</h1>
      <section
        className={css({
          display: 'flex',
          flexFlow: 'wrap',
          gap: '1.5',
          rowGap: '16',
          justifyContent: 'space-between',
        })}
      >
        <Media medias={medias} />
      </section>
    </>
  )
}

function Media({ medias }: InferPageProps<InstagramController, 'getMedia'>) {
  return (
    <>
      {medias.map((data) => {
        if ('thumbnail_url' in data) {
          return (
            <div
              key={`video-${data.id}`}
              className={css({
                maxWidth: '1/4',
              })}
            >
              <Link href={`post/${data.id}`}>
                <img
                  className={css({
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    width: '100%',
                    aspectRatio: '4/5',
                    _hover: {
                      cursor: 'pointer',
                    },
                  })}
                  src={data.thumbnail_url}
                  alt="Choisir cette image pour placer un évenement"
                />
              </Link>
            </div>
          )
        }
        if ('media_url' in data && data.media_type === 'CAROUSEL_ALBUM') {
          return <Carousel data={data} key={`carousel-${data.id}`} />
        }
        return (
          <div
            key={`media-${data.id}`}
            className={css({
              maxWidth: '1/4',
            })}
          >
            <Link href={`post/${data.id}`}>
              <img
                className={css({
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  width: '100%',
                  aspectRatio: '4/5',
                  _hover: {
                    cursor: 'pointer',
                  },
                })}
                src={data.media_url}
                alt="Choisir cette image pour placer un évenement"
              />
            </Link>
          </div>
        )
      })}
    </>
  )
}

function Carousel({ data }: IgMediaCarousel) {
  const container = useRef<Element[] | null>([])
  const carouselControlRef = useRef<HTMLAnchorElement[] | null>([])
  const itemsRef = useRef<Map<unknown, Element>>()

  useEffect(() => {
    let observer: IntersectionObserver
    if (container.current) {
      container.current.forEach((elem) => {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const node = carouselControlRef.current?.find(
                (elem) => elem.getAttribute('data-id') === entry.target.getAttribute('id')
              )
              if (entry.isIntersecting) {
                node?.setAttribute('data-active', 'true')
              } else {
                node?.removeAttribute('data-active')
              }
            })
          },
          { root: elem, threshold: 0.5 }
        )
        for (const child of elem.children) {
          observer.observe(child)
        }
      })
    }
    return () => {
      observer.disconnect()
    }
  }, [])

  function attachNodeOnRef(node: HTMLElement | null, ref: RefObject<Element[]> | null) {
    if (node) {
      if (ref?.current) {
        ref.current.push(node)
      }
    }
  }

  function scrollToCat(e: MouseEvent<Element>, cat: string) {
    const map = getMap()
    const node = map.get(cat)
    if (node) {
      node.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'center',
      })
      e.currentTarget.setAttribute('data-active', 'true')
    }
  }

  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map()
    }
    return itemsRef.current
  }

  function registerNodeInMap(node: HTMLImageElement | null, id: string) {
    if (node) {
      const map = getMap()
      if (node) {
        map.set(id, node)
      }
    }
  }

  return (
    <div
      className={css({
        position: 'relative',
        maxWidth: '1/4',
      })}
    >
      <Link href={`post/${data.id}`}>
        <div
          ref={(node) => attachNodeOnRef(node, container)}
          className={css({
            scrollSnapType: 'x mandatory',
            overflowX: 'scroll',
            scrollSnapStop: 'always',
            scrollBehavior: 'smooth',
            scrollMarginX: '2.5',
            display: 'flex',
          })}
        >
          {data.children.data.map((d) => {
            if ('thumbnail_url' in d) {
              return (
                <img
                  key={`thumb-${d.id}`}
                  id={`slide-${d.id}`}
                  className={css({
                    flex: '1 0 100%',
                    scrollSnapAlign: 'start',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    width: '100%',
                    scrollSnapStop: 'always',
                    aspectRatio: '4/5',
                    _hover: {
                      cursor: 'pointer',
                    },
                  })}
                  src={d.thumbnail_url}
                  alt="Choisir cette image pour placer un évenement"
                />
              )
            }
            return (
              <img
                key={`img-${d.id}`}
                id={`slide-${d.id}`}
                ref={(node) => registerNodeInMap(node, d.id)}
                className={css({
                  flex: '1 0 100%',
                  scrollSnapAlign: 'start',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  width: '100%',
                  aspectRatio: '4/5',
                  scrollSnapStop: 'always',
                  _hover: {
                    cursor: 'pointer',
                  },
                })}
                src={d.media_url}
                alt="Choisir cette image pour placer un évenement"
              />
            )
          })}
        </div>
      </Link>
      <div
        className={css({
          position: 'absolute',
          bottom: '-12%',
          w: 'full',
        })}
      >
        <ul
          className={css({
            justifyContent: 'center',
            gap: '2.5',
            display: 'flex',
          })}
        >
          {data.children.data.map((d, index) => (
            <li key={d.id} className={css({ listStyle: 'none' })}>
              <button
                key={`carousel-item${d.id}`}
                data-id={`slide-${d.id}`}
                onClick={(e) => scrollToCat(e, d.id)}
                ref={(node) => attachNodeOnRef(node, carouselControlRef)}
                className={css({
                  'color': 'white',
                  'width': '35px',
                  'padding': '5px 10px',
                  'borderRadius': 'full',
                  'backgroundColor': 'rgba(0, 0, 0, 0.2)',
                  '_hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    cursor: 'pointer',
                  },
                  '&[data-active=true]': { backgroundColor: '#000' },
                })}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Home.layout = (page: ReactNode) => <AuthLayout children={page} />
export default Home
