'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  FormLabel,
  Button,
  Box,
  FormHelperText,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, UserCircle2, Heart, ChevronDown } from 'lucide-react';

interface FieldData {
  id: number;
  name: string;
  fieldType: 'TEXT' | 'LIST' | 'RADIO';
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
  required: boolean;
  listOfValues1?: string[];
}

interface DynamicFormProps {
  fields: FieldData[];
  onSubmit: (data: any) => void;
  loading?: boolean;
}

const getIcon = (fieldName: string) => {
  const name = fieldName.toLowerCase();
  if (name.includes('name')) return <User size={20} />;
  if (name.includes('email')) return <Mail size={20} />;
  if (name.includes('gender')) return <UserCircle2 size={20} />;
  if (name.includes('love') || name.includes('react')) return <Heart size={20} />;
  return null;
};

export default function DynamicForm({ fields, onSubmit, loading }: DynamicFormProps) {
  const defaultValues = fields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue || '';
    return acc;
  }, {} as any);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });

  const renderField = (field: FieldData) => {
    const rules = {
      required: field.required ? `${field.name} is required` : false,
      minLength: field.minLength ? { value: field.minLength, message: `Minimum length is ${field.minLength}` } : undefined,
      maxLength: field.maxLength ? { value: field.maxLength, message: `Maximum length is ${field.maxLength}` } : undefined,
      pattern: field.name.toLowerCase().includes('email') ? {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address"
      } : undefined
    };

    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: field.id * 0.1 }}
        sx={{ mb: 2.5 }}
      >
        <Controller
          name={field.name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            switch (field.fieldType) {
              case 'TEXT':
                return (
                  <TextField
                    fullWidth
                    label={field.name}
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ color: error ? 'error.main' : 'primary.main', opacity: 0.7 }}>
                          {getIcon(field.name)}
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderWidth: '2px',
                          }
                        }
                      }
                    }}
                  />
                );

              case 'LIST':
                return (
                  <FormControl fullWidth error={!!error}>
                    <InputLabel 
                      id={`label-${field.id}`} 
                      sx={{ 
                        left: '26px',
                        '&.MuiInputLabel-shrink': {
                          left: '0px',
                        }
                      }}
                    >
                      {field.name}
                    </InputLabel>
                    <Select
                      labelId={`label-${field.id}`}
                      value={value}
                      label={field.name}
                      onChange={onChange}
                      IconComponent={() => <ChevronDown size={20} style={{ marginRight: 12, opacity: 0.5 }} />}
                      startAdornment={
                        <InputAdornment position="start" sx={{ ml: 0.5, mr: 0.5, color: 'primary.main', opacity: 0.7 }}>
                          {getIcon(field.name)}
                        </InputAdornment>
                      }
                      sx={{ 
                        borderRadius: '16px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        '& .MuiSelect-select': {
                          paddingLeft: '0px'
                        }
                      }}
                    >
                      {field.listOfValues1?.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                    <AnimatePresence>
                      {error && (
                        <Box component={motion.div} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                          <FormHelperText>{error.message}</FormHelperText>
                        </Box>
                      )}
                    </AnimatePresence>
                  </FormControl>
                );

              case 'RADIO':
                return (
                  <FormControl component="fieldset" error={!!error} sx={{ width: '100%', px: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Box sx={{ color: 'primary.main', opacity: 0.7, display: 'flex' }}>
                        {getIcon(field.name)}
                      </Box>
                      <FormLabel component="legend" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
                        {field.name}
                      </FormLabel>
                    </Box>
                    <RadioGroup value={value} onChange={onChange} row>
                      {field.listOfValues1?.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={
                            <Radio 
                              sx={{ 
                                '&.Mui-checked': { color: 'primary.main' },
                                '& .MuiSvgIcon-root': { fontSize: 20 }
                              }} 
                            />
                          }
                          label={option}
                          sx={{ 
                            '& .MuiFormControlLabel-label': { fontSize: '0.9rem' },
                            mr: 3
                          }}
                        />
                      ))}
                    </RadioGroup>
                    <AnimatePresence>
                      {error && (
                        <Box component={motion.div} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                          <FormHelperText>{error.message}</FormHelperText>
                        </Box>
                      )}
                    </AnimatePresence>
                  </FormControl>
                );

              default:
                return <></>;
            }
          }}
        />
      </Box>
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      {fields.map((field) => (
        <React.Fragment key={field.id}>
          {renderField(field)}
        </React.Fragment>
      ))}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ 
          mt: 4, 
          mb: 2, 
          borderRadius: '16px',
          padding: '14px',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          fontWeight: 700,
          fontSize: '1rem',
          textTransform: 'none',
          boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7c3aed, #db2777)',
            boxShadow: '0 15px 25px -5px rgba(124, 58, 237, 0.5)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&.Mui-disabled': {
            background: 'rgba(255, 255, 255, 0.12)',
          }
        }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Create Account'
        )}
      </Button>
    </Box>
  );
}
