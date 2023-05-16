import { FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { Box, Spinner } from 'native-base';
import CardView from '../../Components/Custom_Card';
import { GET_CHECKINS } from '../../API/GraphQL';
import HandleError from '../../Components/Handle_Error';

interface Item {
  id: string;
  created_at: string;
  image_url: string;
  name: string;
  comment: string;
}

export default function Check_Ins() {
  const { loading, error, data, refetch } = useQuery(GET_CHECKINS);
  const check_in: Item[] = data?.check_in || [];

  const [fetchCheckIns, { loading: loadingLazy }] = useLazyQuery(GET_CHECKINS);

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

  const sortedCheckIns = [...check_in].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB.getTime() - dateA.getTime();
  });
  return (
    <FlatList
      data={sortedCheckIns}
      renderItem={({ item }) => <CardView item={item} />}
      keyExtractor={(item) => item.id}
      refreshing={loading}
      onRefresh={handleRefresh}
    />
  );
}
