/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Content} from '../DataLayer/TransferObjects/Content.type';
const ContentPage = () => {
  const [contentId, setContentId] = useState('');
  const [title, setTitle] = useState('');
  return (
    <View>
      <TextInput
        style={{height: 40}}
        placeholder="Type here for contentId"
        onChangeText={id => {
          setContentId(id);
        }}
        onSubmitEditing={() => {
          fetchContent(contentId)
            .then(content => {
              setTitle(content.title);
            })
            .catch(e => console.log(e));
        }}
        defaultValue={contentId}
      />
      <Text style={{padding: 10, fontSize: 42}}>{title}</Text>
    </View>
  );
};

const fetchContent = async (contentId: string): Promise<Content> => {
  let p = new Promise<Content>(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `http://localhost:8443/content/${contentId}`,
      );
      console.log(response);
      let content = response.data;
      resolve(content);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
  return p;
};
export default ContentPage;
