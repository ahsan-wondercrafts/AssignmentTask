import React, { useState, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CHECK_IN, GET_CHECKINS } from '../../API/GraphQL';
import {Button, Spinner, Text, KeyboardAvoidingView } from 'native-base';
import { Platform } from 'react-native';
import Custom_TextInput from '../../Components/Custom_TextInput';

interface SubmitProps { }

const Submit: React.FC<SubmitProps> = () => {
  const [name, setName] = useState<string | undefined>('');
  const [comment, setComment] = useState<string | undefined>('');
  const [imageUrl, setImageUrl] = useState<string | undefined>('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [imageUrlError, setImageUrlError] = useState<string | null>(null);

  const nameRef = useRef<any>();
  const commentRef = useRef<any>();
  const imageUrlRef = useRef<any>();

  const [addCheckIn, { loading, error }] = useMutation(ADD_CHECK_IN);
  const { refetch } = useQuery(GET_CHECKINS);

  const validateName = () => {
    if (!name) {
      setNameError('Name is required');
    } else {
      setNameError(null);
    }
  };

  const validateComment = () => {
    if (!comment) {
      setCommentError('Comment is required');
    } else {
      setCommentError(null);
    }
  };

  const validateImageUrl = () => {
    if (!imageUrl) {
      setImageUrlError('Image URL is required');
    } else if (!isValidUrl(imageUrl)) {
      setImageUrlError('Invalid URL');
    } else {
      setImageUrlError(null);
    }
  };

  const isValidUrl = (url: string) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  };

  const handleAddCheckIn = async () => {
    validateName();
    validateComment();
    validateImageUrl();

    if (!nameError && !commentError && !imageUrlError) {
      try {
        const response = await addCheckIn({
          variables: {
            check_in: {
              name: name!,
              comment: comment!,
              image_url: imageUrl!,
            },
          },
        });
        console.log(response.data);
        nameRef.current.clear();
        commentRef.current.clear();
        imageUrlRef.current.clear();
        refetch();
        setName('');
        setComment('');
        setImageUrl('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      flex={1}
      px={5}
      py={5}
    >
      <>
        <Custom_TextInput
          inputRef={nameRef}
          placeholder='Name'
          onChangeText={(value) => {
            setName(value);
            setNameError(null);
          }}
          onBlur={validateName}
          error={nameError}
        />

        <Custom_TextInput
          inputRef={commentRef}
          placeholder='Comment'
          onChangeText={(value) => {
            setComment(value);
            setCommentError(null);
          }}
          onBlur={validateComment}
          error={commentError}
        />

        <Custom_TextInput
          inputRef={imageUrlRef}
          placeholder='ImageUrl'
          onChangeText={(value) => {
            setImageUrl(value);
            setImageUrlError(null);
          }}
          onBlur={validateImageUrl}
          error={imageUrlError}
        />
        <Button
          backgroundColor='#543cdc'
          width='100%'
          alignItems='center'
          borderRadius={8}
          paddingY={14}
          onPress={handleAddCheckIn}
          disabled={!!nameError || !!commentError || !!imageUrlError || loading}
        >
          {loading ? <Spinner color={'#ffffff'} size={'small'} /> : <Text color={'white'} fontSize={22}>ADD</Text>}
        </Button>
      </>
    </KeyboardAvoidingView>
  );
};

export default Submit;
