import { createConnection, Connection } from 'typeorm'

let conn: Promise<Connection>;
export function returnConnection(): Promise<Connection> {
    if(!!conn) return conn
    return createConnection()
}