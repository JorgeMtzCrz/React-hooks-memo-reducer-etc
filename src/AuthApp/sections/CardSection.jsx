import React, { useState, useRef } from 'react'
import useSWR from 'swr'
import composeData from '../../utils/composeData'
import handleAsync from '../../utils/handleAsync'
import { ALL_URL, ALL_FETCHER, CREATE_CARD, DELETE_CARD, UPDATE_CARD } from '../../services/card_service'
import { UPLOAD_PHOTO} from '../../services/general_service'
import { Flex, Heading, Button, SimpleGrid } from '@chakra-ui/core'
import CardCreate from '../../components/CardCreate'
import CardCard from '../../components/CardCard'
import useInput from '../../hooks/useInput'

export default function CardSection() {
  const [create, setCreate] = useState(false)
  const [img, setImg] = useState('')

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
  const description = useInput('')


  const { data, mutate } = useSWR(ALL_URL, ALL_FETCHER)
  
  const cards = data && data.cards

  const [visibility, setVisibility] = useState(false)
  const [modalInfo, setModalInfo] = useState({ title: '', content: '', type: 'success' })


  const submit = async e => {
    e.preventDefault()
    const newCard = composeData({ title, subtitle, description, url  })
    const response = await handleAsync(() => CREATE_CARD({newCard, img}))
    if (response.card) {
      setModalInfo({
        title: 'Card Created',
        content: 'Your card has been created successfully!',
        type: 'success'
      })
    } else {
      setModalInfo({
        title: 'ERROR',
        content:
          'UH OH! There has been an error and your card has not been created. Please check your internet connection and try again.',
        type: 'error'
      })
    }
    mutate([response.cards, ...data.cards], true)
    setVisibility(true)
  }

  const closeModal = () => {
    setVisibility(false)
    setCreate(false)
  }

  const deleteCard = async id => {
    await handleAsync(() => DELETE_CARD(id))

    mutate(
      ALL_URL,
      data.cards.filter(card => card._id !== id),
      false
    )
  }




  if(!cards) return <p>Loading</p>
  let cardFilters = cards.filter(card => card.available === true)

  const changeAble = async (id, data) =>{
    const response = await handleAsync(()=> UPDATE_CARD(id, data))
    mutate([response.card, data.cards], true)

  }

  return (
    <Flex direction="column" align="flex-start" h="100%">
      <Heading size="lg" as="h2" color="gray.500" mb={[3, 3, 5, 10]}>
        Cards
      </Heading>
      {!create ? (
        <>
          <SimpleGrid mb={[3, 3, 5, 10]} alignSelf="flex-end" columns="1" spacing={[5, 5, 10, 10]}>
            <Button onClick={() => setCreate(true)} variantColor="bluebdd" size="lg">
              Add Card
            </Button>
          </SimpleGrid>
          <Heading size="md" as="h3" color="bluebdd.800" mb={[3, 3, 5, 5]}>
            Card Entries
          </Heading>
          <CardCard deleteCard={deleteCard} changeAble={changeAble} data={cards} />
        </>
      ) : (
        <CardCreate
          visibility={visibility}
          closeModal={closeModal}
          modalInfo={modalInfo}
          submit={submit}
          title={title}
          subtitle={subtitle}
          url={url}
          img={img}
          description={description}
          handleImage={handleImage}
          cancel={() => setCreate(false)}
        />
      )}
    </Flex>
  )
}