import React from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Select,
  Icon
} from '@chakra-ui/core'
import MyModal from './MyModal'
import useForm from '../hooks/useForm'


export default function ProductsCreate(props) {
  const [form, handleInput] = useForm()
  
  const {
    submit,
    cancel,
    title,
    price,
    discount,
    photo,
    description,
    cathegory,
    modalInfo,
    visibility,
    closeModal,
    handleImage,
    specifications,
    setSpecifications,
  } = props

  const product = {
    titleSpecification: form.titleSpecification,
    descriptionProduct: form.descriptionProduct

  }

  const addToCart = (product) =>{
    if (specifications.title === ''){
      console.log('The field Title is required to add item')
    }

    else if( form.descriptionProduct === ''){
      console.log('The field rate is required to add item')
    } 
    else{
      document.getElementById("titleSpecification").value = "";
      document.getElementById("descriptionProduct").value = "";

      setSpecifications(prevState => [...prevState, product])

    }
  }
  return (
    <>
      <Box
        p={[10, 10, 10, 20]}
        boxShadow="2xl"
        w="100%"
        boxSizing="border-box"
        borderRadius="8px"
        display="flex"
        flexDirection="column"
      >
        <Box as="form" onSubmit={submit} display="flex" flexDirection="column">
          <SimpleGrid w="100%" columns="2" spacing={[5, 5, 5, 20]}>
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="title" color="gray.500">
                TITLE
              </FormLabel>
              <Input
                {...title}
                focusBorderColor="bluebdd.500"
                size="m"
                type="text"
                id="title"
                aria-describedby="subject-helper-text"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="description" color="gray.500">
                DESCRIPTION
              </FormLabel>
              <Textarea
                {...description}
                id="description"
                aria-describedby="description-helper-text"
                focusBorderColor="bluebdd.500"
                size="m"
                resize="none"
              />
            </FormControl>
            
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="cathegory" color="graypf.500">
                CATHEGORY
              </FormLabel>
              <Select
                {...cathegory} 
                aria-describedby="description-helper-text"
                color="gray.500"
                type="select"
                size="m" 
                id="cathegory">
                <option  selected>SELECT ONE</option>
                <option value="hdtvs">HDTV'S</option>
                <option value="accesories">ACCESORIES</option>
                <option value="computers">COMPUTERS</option>
                <option value="audio">AUDIO</option>
                <option value="smartphones">SMARTPHONES</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="subtitle" color="gray.500">
                PRICE
              </FormLabel>
              <Input
                {...price}
                focusBorderColor="bluebdd.500"
                size="m"
                type="number"
                id="price"
                aria-describedby="subtitle-helper-text"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="url" color="gray.500">
                DISCOUNT
              </FormLabel>
              <Input
                {...discount}
                focusBorderColor="bluebdd.500"
                size="m"
                type="text"
                id="url"
                aria-describedby="url-helper-text"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xl" htmlFor="photo" color="gray.500">
                IMAGE
              </FormLabel>
              <Input
                {...photo}
                onChange={handleImage}
                size="m"
                type="file"
                id="photo"
              />
            </FormControl>
            <FormControl>
            <FormLabel fontSize="xl" htmlFor="description" color="gray.500">
             SPECIFICATIONS
            </FormLabel>
              <table>
                <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>
                <tbody>
                {specifications.length === 0 ? 'Add Specifications' : specifications.map((el, i) => (
                  <tr key={i}>
                    <td>
                    {el.titleSpecification}
                    </td>
                    <td>
                    {el.descriptionProduct}
                    </td>
                    <td>
                    <Icon cursor="pointer" name="trash" onClick={e =>
      
                      setSpecifications(prevState => {
                      var filter = specifications.filter(e => e !== specifications[i])
                          setSpecifications( filter)
                      })} />
                  </td>
                </tr>
                  )) }
                </tbody>
              </table>
              <br/>
              <label className="form-control-label" htmlFor="input-merchant">Title Specification *</label>
              <Input
                name="titleSpecification"
                placeholder="Enter a title specification"
                type="text"
                id="titleSpecification"
                size="m"
                onChange={handleInput}
              />
              <br/>
              <label className="form-control-label" htmlFor="input-merchant">Description Specification</label>
              <Input
                name="descriptionProduct"
                size="m"
                placeholder="Enter a description of specification"
                type="text"
                id="descriptionProduct"
                onChange={handleInput}
              />
              <br/>
              <Button
                variantColor="bluebdd"
                onClick={(e) => addToCart(product)}
              >
                Add Specification
              </Button>
            </FormControl>


          </SimpleGrid>
          <ButtonGroup mt={20} spacing={16} alignSelf="flex-start">
            <Button onClick={cancel} w="124px" h="52px" variantColor="red">
              CANCEL
            </Button>
            <Button onClick={submit} type="submit" w="124px" h="52px" variantColor="bluebdd" variant="solid">
              SEND
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <MyModal {...modalInfo} isOpen={visibility} onClose={closeModal} />
    </>
  )
}
