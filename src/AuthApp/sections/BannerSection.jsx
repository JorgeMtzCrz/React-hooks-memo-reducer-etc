import React, { useState, useRef } from 'react'
import useSWR from 'swr'
import composeData from '../../utils/composeData'
import handleAsync from '../../utils/handleAsync'
import { ALL_URL, ALL_FETCHER, CREATE_BANNER, UPDATE_BANNER, DELETE_BANNER } from '../../services/banner_service'
import { UPLOAD_PHOTO} from '../../services/general_service'
import { Flex, Heading, Button, SimpleGrid } from '@chakra-ui/core'
import BannerCreate from '../../components/BannerCreate'
import BannerCard from '../../components/BannerCard'
import useInput from '../../hooks/useInput'

export default function BannerSection() {
  const [create, setCreate] = useState(false)
  const [img, setImg] = useState('')
  const imgEl = useRef()

  const uploadImage = () => imgEl.current.click()

  const handleImage = async e => {
    const formData = new FormData()
    formData.append('photo', e.target.files[0])
    const response = await handleAsync(() => UPLOAD_PHOTO(formData))
    const {img} = response
    setImg(img)
  }

  // create data
  const title = useInput('')
  const subtitle = useInput('')
  const url = useInput('')


  const { data, mutate } = useSWR(ALL_URL, ALL_FETCHER)
  const banners = data && data.banners
  const [visibility, setVisibility] = useState(false)
  const [modalInfo, setModalInfo] = useState({ title: '', content: '', type: 'success' })

  const submit = async e => {
    e.preventDefault()
    const newBanner = composeData({ title, subtitle, url  })
    const response = await handleAsync(() => CREATE_BANNER({newBanner, img}))
    if (response.banner) {
      setModalInfo({
        title: 'Banner Created',
        content: 'Your header has been created successfully!',
        type: 'success'
      })
    } else {
      setModalInfo({
        title: 'ERROR',
        content:
          'UH OH! There has been an error and your banner has not been created. Please check your internet connection and try again.',
        type: 'error'
      })
    }
    mutate([response.banners, ...data.banners], true)
    setVisibility(true)
  }

  const closeModal = () => {
    setVisibility(false)
    setCreate(false)
  }

  const deleteBanner = async id => {
    await handleAsync(() => DELETE_BANNER(id))

    mutate(
      ALL_URL,
      data.banners.filter(banner => banner._id !== id),
      false
    )
  }
  if(!banners) return <p>Loading</p>
  let bannerFilters = banners.filter(banner => banner.available )
  console.log(bannerFilters)
  const changeAble = async (id, data) =>{

    const response =  await handleAsync(()=> UPDATE_BANNER(id, data)) 
    mutate([response.banner, data.banners], true) 

  }

  return (
    <Flex direction="column" align="flex-start" h="100%">
      <Heading size="lg" as="h2" color="gray.500" mb={[3, 3, 5, 10]}>
        Banner
      </Heading>
      {!create ? (
        <>
          <SimpleGrid mb={[3, 3, 5, 10]} alignSelf="flex-end" columns="1" spacing={[5, 5, 10, 10]}>
            <Button onClick={() => setCreate(true)} variantColor="bluebdd" size="lg">
              Add Banner
            </Button>
          </SimpleGrid>
          <Heading size="md" as="h3" color="bluebdd.800" mb={[3, 3, 5, 5]}>
            Banner Entries
          </Heading>
          <BannerCard deleteBanner={deleteBanner} changeAble={changeAble} data={banners} />
        </>
      ) : (
        <BannerCreate
          visibility={visibility}
          closeModal={closeModal}
          modalInfo={modalInfo}
          submit={submit}
          title={title}
          subtitle={subtitle}
          url={url}
          handleImage={handleImage}
          cancel={() => setCreate(false)}
        />
      )}
    </Flex>
  )
}