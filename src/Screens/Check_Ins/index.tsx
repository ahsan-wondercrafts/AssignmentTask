import { FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { Box, Spinner } from 'native-base';
import CardView from '../../Components/Custom_Card';
import { My_Query } from '../../API/GraphQL';
import HandleError from '../../Components/Handle_Error';

interface Item {
  id: string;
  created_at: string;
  image_url: string;
  name: string;
  comment: string;
}

export default function Check_Ins() {
  const { loading, error, data, refetch } = useQuery(My_Query);
  const check_in: Item[] = data?.check_in || [];

  const [fetchCheckIns, { loading: loadingLazy }] = useLazyQuery(My_Query);

  useEffect(() => {
    fetchCheckIns();
  }, []);

  const handleRefresh = () => {
    refetch();
  };

  if (loading || loadingLazy) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner color="blue" size="large" />
      </Box>
    );
  }

  if (error) {
    return <HandleError error={error} />;
  }

  return (
    <FlatList
      data={check_in}
      renderItem={({ item }) => <CardView item={item} />}
      keyExtractor={item => item.id}
      refreshing={loading}
      onRefresh={handleRefresh}
    />
  );
}
