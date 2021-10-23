import { Button, Card, CardBody, CardHeader, Form, FormGroup } from 'reactstrap'
import { useQuery, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'

import {
  ADD_DIRECTOR,
  ADD_MOVIE,
  DIRECTOR_LIST,
  MOVIE_LIST,
} from '../queries/queries'

function SideNav() {
  const { data } = useQuery(DIRECTOR_LIST)
  const { register, handleSubmit } = useForm()
  const { register: registerDirector, handleSubmit: handleSubmitDirector } =
    useForm()
  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: MOVIE_LIST }],
    awaitRefetchQueries: true,
  })
  const [addDirector] = useMutation(ADD_DIRECTOR, {
    refetchQueries: [{ query: DIRECTOR_LIST }],
    awaitRefetchQueries: true,
  })

  const onSubmit = ({ movieName, movieGenre, directorId }, e) => {
    addMovie({
      variables: { name: movieName, genre: movieGenre, directorId },
    })
    e.target.reset()
  }

  const onSubmitDirector = ({ directorName, directorAge }, e) => {
    addDirector({
      variables: { name: directorName, age: parseInt(directorAge) },
    })
    e.target.reset()
  }

  return (
    <div>
      <Card>
        <CardHeader>映画監督</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmitDirector(onSubmitDirector)}>
            <FormGroup>
              <input
                type="text"
                className="form-control"
                placeholder="監督名"
                {...registerDirector('directorName')}
              />
            </FormGroup>
            <FormGroup>
              <input
                type="number"
                className="form-control"
                placeholder="年齢"
                {...registerDirector('directorAge')}
              />
            </FormGroup>
            <Button type="submit" color="primary">
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>
      <Card className="mt-4">
        <CardHeader>映画作品</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <input
                type="text"
                className="form-control"
                placeholder="タイトル"
                {...register('movieName')}
              />
            </FormGroup>
            <FormGroup>
              <input
                type="text"
                className="form-control"
                placeholder="ジャンル"
                {...register('movieGenre')}
              />
            </FormGroup>
            <FormGroup>
              <select
                type="select"
                className="form-control"
                {...register('directorId')}
              >
                {data &&
                  data.directors.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
              </select>
            </FormGroup>
            <Button type="submit" color="primary">
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default SideNav
