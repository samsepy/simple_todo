import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from '@/components/todo-item'
import { type Todo } from '@/generated/graphql'

const mockTodo: Todo = {
  id: '1',
  title: 'Test Todo',
  completed: false,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

const mockCompletedTodo: Todo = {
  ...mockTodo,
  id: '2',
  title: 'Completed Todo',
  completed: true,
}

const mockProps = {
  onUpdate: jest.fn(),
  onDelete: jest.fn(),
  onToggle: jest.fn(),
}

describe('TodoItem', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders todo item correctly', () => {
    render(<TodoItem todo={mockTodo} {...mockProps} />)
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  it('renders completed todo with strikethrough', () => {
    render(<TodoItem todo={mockCompletedTodo} {...mockProps} />)
    
    const todoText = screen.getByText('Completed Todo')
    expect(todoText).toHaveClass('line-through', 'text-gray-500')
  })

  it('shows checkmark for completed todo', () => {
    render(<TodoItem todo={mockCompletedTodo} {...mockProps} />)
    
    const toggleButton = screen.getAllByRole('button')[0]
    expect(toggleButton).toHaveClass('bg-green-500', 'border-green-500', 'text-white')
  })

  it('calls onToggle when checkbox is clicked', async () => {
    render(<TodoItem todo={mockTodo} {...mockProps} />)
    
    const toggleButton = screen.getAllByRole('button')[0]
    await userEvent.click(toggleButton)
    
    expect(mockProps.onToggle).toHaveBeenCalledWith('1')
  })

  it('enters edit mode when title is clicked', async () => {
    render(<TodoItem todo={mockTodo} {...mockProps} />)
    
    const todoText = screen.getByText('Test Todo')
    await userEvent.click(todoText)
    
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  it('enters edit mode when edit button is clicked', async () => {
    render(<TodoItem todo={mockTodo} {...mockProps} />)
    
    const editButton = screen.getByRole('button', { name: /edit/i })
    await userEvent.click(editButton)
    
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument()
  })

  it('calls onUpdate when edited and saved', async () => {
    render(<TodoItem todo={mockTodo} {...mockProps} />)
    
    const todoText = screen.getByText('Test Todo')
    await userEvent.click(todoText)
    
    const input = screen.getByDisplayValue('Test Todo')
    await userEvent.clear(input)
    await userEvent.type(input, 'Updated Todo')
    
    const saveButton = screen.getByRole('button', { name: /save/i })
    await userEvent.click(saveButton)
    
    expect(mockProps.onUpdate).toHaveBeenCalledWith('1', 'Updated Todo')
  })

  it('cancels edit when cancel button is clicked', async () => {
    render(<TodoItem todo={mockTodo} {...mockProps} />)
    
    const todoText = screen.getByText('Test Todo')
    await userEvent.click(todoText)
    
    const input = screen.getByDisplayValue('Test Todo')
    await userEvent.clear(input)
    await userEvent.type(input, 'Changed Text')
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    
    // Clear the mock before clicking cancel to avoid counting onBlur calls
    jest.clearAllMocks()
    await userEvent.click(cancelButton)
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument()
    expect(mockProps.onUpdate).not.toHaveBeenCalled()
  })

  it('saves on Enter key press', async () => {
    render(<TodoItem todo={mockTodo} {...mockProps} />)
    
    const todoText = screen.getByText('Test Todo')
    await userEvent.click(todoText)
    
    const input = screen.getByDisplayValue('Test Todo')
    await userEvent.clear(input)
    await userEvent.type(input, 'Updated Todo{enter}')
    
    expect(mockProps.onUpdate).toHaveBeenCalledWith('1', 'Updated Todo')
  })

  it('cancels on Escape key press', async () => {
    render(<TodoItem todo={mockTodo} {...mockProps} />)
    
    const todoText = screen.getByText('Test Todo')
    await userEvent.click(todoText)
    
    const input = screen.getByDisplayValue('Test Todo')
    await userEvent.clear(input)
    await userEvent.type(input, 'Changed Text{escape}')
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument()
    expect(mockProps.onUpdate).not.toHaveBeenCalled()
  })

  it('calls onDelete when delete button is clicked', async () => {
    render(<TodoItem todo={mockTodo} {...mockProps} />)
    
    const deleteButton = screen.getByRole('button', { name: /delete/i })
    await userEvent.click(deleteButton)
    
    expect(mockProps.onDelete).toHaveBeenCalledWith('1')
  })

  it('does not call onUpdate if title is unchanged', async () => {
    render(<TodoItem todo={mockTodo} {...mockProps} />)
    
    const todoText = screen.getByText('Test Todo')
    await userEvent.click(todoText)
    
    const saveButton = screen.getByRole('button', { name: /save/i })
    await userEvent.click(saveButton)
    
    expect(mockProps.onUpdate).not.toHaveBeenCalled()
  })
})