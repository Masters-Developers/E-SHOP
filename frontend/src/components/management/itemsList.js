import React, { Fragment, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from '../../actions/ItemsActions'
import {Link } from "react-router-dom"

export const ItemsList = () => {
    const { loading, items, error} = useSelector(state=> state.items)
    const alert= useAlert();

    const dispatch = useDispatch();
    useEffect(() => {
        if (error){
            return alert.error(error)
        }

        dispatch(getItems());
    }, [dispatch,error, alert])

    const setitems = () => {
        const data = {
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Seller',
                    field: 'seller',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        items.forEach(item => {
            data.rows.push({
                name: item.name,
                price: `$${item.price}`,
                stock: item.stock,
                seller: item.seller,
                actions: <Fragment>
                    <Link to={`/items/${item._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link><Link to="/" className="btn btn-warning py-1 px-2">
                    <i class="fa fa-pencil"></i>
                    </Link>

                    <Link to="/" className="btn btn-danger py-1 px-2">
                        <i className="fa fa-trash"></i>
                    </Link>
                    

                </Fragment>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'All items'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5"> Registered items </h1>

                        {loading ? <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i> :(
                            <MDBDataTable
                                data={setitems()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}
export default ItemsList;