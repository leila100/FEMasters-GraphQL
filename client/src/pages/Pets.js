import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import PetBox from "../components/PetBox";
import NewPet from "../components/NewPet";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "../components/Loader";

const GET_PETS = gql`
  query GetPetsQuery {
    pets {
      id
      createdAt
      name
      type
      img
      user {
        id
        age @client
      }
    }
  }
`;

const NEW_PET = gql`
  mutation CreatePet($newPetData: NewPetInput!) {
    newPet(input: $newPetData) {
      id
      createdAt
      name
      type
      img
    }
  }
`;

export default function Pets() {
  const [modal, setModal] = useState(false);
  const { data, loading, error } = useQuery(GET_PETS);
  const [addPet, answer] = useMutation(NEW_PET, {
    update(cache, { data: { newPet } }) {
      const { pets } = cache.readQuery({ query: GET_PETS });
      cache.writeQuery({
        query: GET_PETS,
        data: { pets: [newPet, ...pets] },
      });
    },
  });
  if (loading) return <Loader />;
  if (error || answer.error) return `Error! ${error.message}`;

  const onSubmit = (input) => {
    addPet({
      variables: { newPetData: { ...input, userId: 1 } },
      optimisticResponse: {
        __typename: "Mutation",
        newPet: {
          id: 10,
          __typename: "Pet",
          createdAt: 1,
          name: input.name,
          type: input.type,
          img: "image",
          user: {
            id: 555,
            age: 46,
          },
        },
      },
    });
    setModal(false);
  };

  const petsList = data.pets.map((pet) => (
    <div className='col-xs-12 col-md-4 col' key={pet.id}>
      <div className='box'>
        <PetBox pet={pet} />
      </div>
    </div>
  ));

  console.log(data.pets[0]);

  if (modal) {
    return (
      <div className='row center-xs'>
        <div className='col-xs-8'>
          <NewPet onSubmit={onSubmit} onCancel={() => setModal(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className='page pets-page'>
      <section>
        <div className='row betwee-xs middle-xs'>
          <div className='col-xs-10'>
            <h1>Pets</h1>
          </div>

          <div className='col-xs-2'>
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <div className='row'>{petsList}</div>
      </section>
    </div>
  );
}
