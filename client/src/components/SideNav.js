import { Button, Card, CardBody, CardHeader, Form, FormGroup } from 'reactstrap'
import { useQuery, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'

import { DIRECTOR_LIST, ADD_MOVIE } from '../queries/queries'

function SideNav() {
  const { data } = useQuery(DIRECTOR_LIST)
  const [addMovie] = useMutation(ADD_MOVIE)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = ({ movieName, movieGenre, directorId }) => {
    addMovie({
      variables: { name: movieName, genre: movieGenre, directorId },
    })
  }

  return (
    <div>
      <Card>
        <CardHeader>映画監督</CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <input
                type="text"
                className="form-control"
                name="directorName"
                placeholder="監督名"
              />
            </FormGroup>
            <FormGroup>
              <input
                type="number"
                className="form-control"
                name="directorAge"
                placeholder="年齢"
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
