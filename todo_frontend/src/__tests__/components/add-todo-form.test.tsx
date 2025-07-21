import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddTodoForm from '@/components/add-todo-form'

const mockOnSubmit = jest.fn()

describe('AddTodoForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders form correctly', () => {
    render(<AddTodoForm onSubmit={mockOnSubmit} />)
    
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument()
  })

  it('submits form with valid input', async () => {
    mockOnSubmit.mockResolvedValue(undefined)
    render(<AddTodoForm onSubmit={mockOnSubmit} />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    const submitButton = screen.getByRole('button', { name: /add todo/i })
    
    await userEvent.type(input, 'New Todo')
    await userEvent.click(submitButton)
    
    expect(mockOnSubmit).toHaveBeenCalledWith('New Todo')
  })

  it('submits form on Enter key press', async () => {
    mockOnSubmit.mockResolvedValue(undefined)
    render(<AddTodoForm onSubmit={mockOnSubmit} />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    
    await userEvent.type(input, 'New Todo{enter}')
    
    expect(mockOnSubmit).toHaveBeenCalledWith('New Todo')
  })

  it('clears input after successful submission', async () => {
    mockOnSubmit.mockResolvedValue(undefined)
    render(<AddTodoForm onSubmit={mockOnSubmit} />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    
    await userEvent.type(input, 'New Todo')
    await userEvent.click(screen.getByRole('button', { name: /add todo/i }))
    
    await waitFor(() => {
      expect(input).toHaveValue('')
    })
  })

  it('trims whitespace from input', async () => {
    mockOnSubmit.mockResolvedValue(undefined)
    render(<AddTodoForm onSubmit={mockOnSubmit} />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    
    await userEvent.type(input, '  Spaced Todo  ')
    await userEvent.click(screen.getByRole('button', { name: /add todo/i }))
    
    expect(mockOnSubmit).toHaveBeenCalledWith('Spaced Todo')
  })

  it('does not submit empty or whitespace-only input', async () => {
    render(<AddTodoForm onSubmit={mockOnSubmit} />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    const submitButton = screen.getByRole('button', { name: /add todo/i })
    
    // Test empty input
    await userEvent.click(submitButton)
    expect(mockOnSubmit).not.toHaveBeenCalled()
    
    // Test whitespace-only input
    await userEvent.type(input, '   ')
    await userEvent.click(submitButton)
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('disables button when input is empty', () => {
    render(<AddTodoForm onSubmit={mockOnSubmit} />)
    
    const submitButton = screen.getByRole('button', { name: /add todo/i })
    expect(submitButton).toBeDisabled()
  })

  it('enables button when input has content', async () => {
    render(<AddTodoForm onSubmit={mockOnSubmit} />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    const submitButton = screen.getByRole('button', { name: /add todo/i })
    
    await userEvent.type(input, 'New Todo')
    expect(submitButton).not.toBeDisabled()
  })

  it('shows loading state during submission', async () => {
    let resolveSubmit: () => void
    const submitPromise = new Promise<void>((resolve) => {
      resolveSubmit = resolve
    })
    mockOnSubmit.mockReturnValue(submitPromise)
    
    render(<AddTodoForm onSubmit={mockOnSubmit} />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    await userEvent.type(input, 'New Todo')
    await userEvent.click(screen.getByRole('button', { name: /add todo/i }))
    
    expect(screen.getByText('Adding...')).toBeInTheDocument()
    expect(input).toBeDisabled()
    
    resolveSubmit()
    await waitFor(() => {
      expect(screen.getByText('Add Todo')).toBeInTheDocument()
    })
  })

  it('handles submission errors gracefully', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    mockOnSubmit.mockRejectedValue(new Error('Submission failed'))
    
    render(<AddTodoForm onSubmit={mockOnSubmit} />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    await userEvent.type(input, 'New Todo')
    await userEvent.click(screen.getByRole('button', { name: /add todo/i }))
    
    await waitFor(() => {
      expect(screen.getByText('Add Todo')).toBeInTheDocument()
    })
    
    expect(consoleError).toHaveBeenCalledWith('Error creating todo:', expect.any(Error))
    consoleError.mockRestore()
  })
})