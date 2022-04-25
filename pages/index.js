import { Box, Checkbox, Container, FormLabel, Heading, Text, Spinner, Button, Input, HStack, VStack } from '@chakra-ui/react'
import { useState, useId, useTransition, useSyncExternalStore, useDeferredValue } from 'react'

const list = [
  "apple",
  "banana",
  "crab",
  "dog",
  "eggplant"
]

export default function Home() {
  const id = useId()
  const [isPending, startTransition] = useTransition()
  const [product, setProduct] = useState("")
  const [products, setProducts] = useState([])
  const [value, setValue] = useState("")
  const [randomValue, setRandomValue] = useState(0)
  const deferredValue = useDeferredValue(value, { timeoutMs: 5000 })
  const deferredList = useDeferredValue(list, { timeoutMs: 5000 })


  function handleClick() {
    startTransition(() => {
      setRandomValue(Math.random() * 1000000);
    })
  }

  function pushProject(event) {
    startTransition(() => {
      setProduct(event.target.value)
      setProducts([...products, product])
    })
  }

  return (
    <Box pt={16}>
      <Container maxW="container.xl">
        <Heading mb={4}>React 18 New Hooks</Heading>
        <Heading mb={2}>useId</Heading>
        <HStack spacing={4} mb={8}>
          <Text>Checkbox Id: {id}</Text>
          <Checkbox id={id} />
        </HStack>
        <Heading mb={2}>useTransition</Heading>
        <Input onChange={(e) => pushProject(e)} mb={2} />
        <Text mb={2}>Products</Text>
        <VStack align="start" spacing={0} mb={2}>
          {
            isPending ? <Spinner /> : products.map((item, itemKey) => (
              <Text key={itemKey}>{item}</Text>
            ))
          }
        </VStack>
        <Heading mb={2}>useDeferredValue</Heading>
        <Input mb={2} onChange={(e) => setValue(e.target.value)} />
        <Text>Value: {value}</Text>
        <Text mb={2}>Deferred Value: {deferredValue}</Text>
        <Text>Deferred List:</Text>
        {
          deferredList.map((item, itemKey) => (
            <Text key={itemKey}>{item}</Text>
          ))
        }
      </Container>
    </Box>
  )
}
