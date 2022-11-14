import {
  Button,
  VStack,
  Heading,
  Text,
  FlatList,
  Box,
  HStack,
  Spacer,
  Link
} from "native-base";
import * as Clipboard from 'expo-clipboard';
import { GestureResponderEvent } from "react-native";

interface ShortenedUrlListProps {
  displayAlert: Function;
  items       : Array<ShortUrl>;
}

export default function ShortenedUrlList(props: ShortenedUrlListProps) {
  const copyToClipboard = async (event: GestureResponderEvent, item: ShortUrl) => {
    event.preventDefault();
    await Clipboard.setStringAsync(item.shortUrl);
    props.displayAlert('info', 'Copied to clipboard!');
  };

  return (
    <>
      <Heading mt="10" mb="5">
        Shortened URLs
      </Heading>

      <FlatList data={props.items} renderItem={({ item }) =>
        <Box pl={["0", "4"]} pr={["0", "5"]} py="2">
          <HStack space={[2, 3]} justifyContent="space-between">
            <VStack>
              <Text color="coolGray.600">
                <Link href={item.shortUrl}>{item.shortUrl}</Link>
              </Text>
              <Spacer />
              <Text fontSize="xs" color="coolGray.800" ellipsizeMode='tail' numberOfLines={1} style={{width:250}}>
                {item.originalLink}
              </Text>
            </VStack>
            <Spacer />
            <Button colorScheme="blue" onPress={(event) => copyToClipboard(event, item)}>Copy</Button>
          </HStack>
        </Box>} keyExtractor={item => item.code} />
    </>
  );
}