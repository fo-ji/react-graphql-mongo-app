import { Button, Card, CardBody, CardHeader, Form, FormGroup } from 'reactstrap'
import { useQuery } from '@apollo/client'

import { DIRECTOR_LIST } from '../queries/queries'

function SideNav() {
  const { data } = useQuery(DIRECTOR_LIST)

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
          <Form>
            <FormGroup>
              <input
                type="text"
                className="form-control"
                name="movieName"
                placeholder="タイトル"
              />
            </FormGroup>
            <FormGroup>
              <select type="select" className="form-control" name="directorId">
                {data &&
                  data.directors.map(({ id, name }) => (
                    <option key={id}>{name}</option>
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
