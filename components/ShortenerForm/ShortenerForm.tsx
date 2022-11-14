import React from "react";
import {
  Button,
  VStack,
  FormControl,
  Input,
} from "native-base";

export default function ShortenerForm() {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    setErrors({});
    if (formData.url === undefined) {
      setErrors({ ...errors, url: 'URL is required' });
      return false;
    } else if (formData.url.length < 3) {
      setErrors({ ...errors, url: 'URL is too short' });
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    validate() ? console.log('Submitted') : console.log('Validation Failed');
  };

  return <VStack mx="10" mt="10">
    <FormControl isRequired isInvalid={'url' in errors}>

      <FormControl.Label _text={{ bold: true }}>URL</FormControl.Label>

      <Input placeholder="https://..."
        onChangeText={value => setData({ ...formData, url: value })} />

      {'url' in errors ? <FormControl.ErrorMessage>URL should contain atleast 3 character.</FormControl.ErrorMessage> : ""}

    </FormControl>

    <Button onPress={onSubmit} mt="5" colorScheme="blue">
      Make it short!
    </Button>

  </VStack>;
}