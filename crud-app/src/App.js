"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css";


const App = () => {
  const [items, setItems] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:3001/api/items")
    setItems(response.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingId) {
      await axios.put(`http://localhost:3001/api/items/${editingId}`, { name, description })
    } else {
      await axios.post("http://localhost:3001/api/items", { name, description })
    }
    setName("")
    setDescription("")
    setEditingId(null)
    fetchItems()
  }

  const handleEdit = (item) => {
    setName(item.name)
    setDescription(item.description)
    setEditingId(item.id)
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/api/items/${id}`)
    fetchItems()
  }

  return (
    <div>
      <h1 >TO DO LIST </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Task"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingId ? "Update" : "Add"} Item
        </button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-2">
            {item.name} - {item.description}
            <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white p-1 rounded ml-2">
              Edit
            </button>
            <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white p-1 rounded ml-2">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;