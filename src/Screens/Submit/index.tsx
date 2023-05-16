import React, { useState, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CHECK_IN, My_Query } from '../../API/GraphQL';
import { Container, Button, Spinner, Text, ScrollView } from 'native-base';
import Custom_TextInput from '../../Components/Custom_TextInput';
import styles from './style';

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
  const { refetch } = useQuery(My_Query);

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
              name: name,
              comment: comment,
              image_url: imageUrl,
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
    <ScrollView>
      <Container style={styles.MainViewStyle}>
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
          style={{
            backgroundColor: '#543cdc',
            width: '100%',
            alignItems: 'center',
            borderRadius: 10,
            height: '20%',
          }}
          onPress={handleAddCheckIn}
          disabled={!!nameError || !!commentError || !!imageUrlError || loading}
        >
          {loading ? <Spinner color='#ffffff' size='small' /> : <Text color='white'>ADD</Text>}
        </Button>
      </Container>
    </ScrollView>
  );
};

export default Submit;
