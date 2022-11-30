import Head from 'next/head';
import { useState } from 'react';

import { AddButton } from '@/components/Button/AddButton';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Loader } from '@/components/Loader';
import { TodoInput } from '@/components/TodoInput';
import { useFirebase } from '@/hooks/useFirebase';

export default function Home() {
    const { todoList, addNewTodo, toggleCheck, removeTodo } =
        useFirebase('todoList');

    const [inputTodo, setInputTodo] = useState<string>('');

    const loading = !todoList && true;

    const addTodo = (title: string) => {
        addNewTodo({
            title: title,
            isDone: false,
        });
    };

    const handleClick = (key: string, isDone: boolean) => {
        toggleCheck(key, !isDone);
    };

    return (
        <div>
            <Head>
                <title>Todo List</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="h-screen flex items-center flex-col pt-28">
                {/* Input Area */}
                <div className="flex w-11/12 max-w-md">
                    <TodoInput {...{ inputTodo, setInputTodo, addTodo }} />
                    <AddButton {...{ inputTodo, setInputTodo, addTodo }} />
                </div>

                {/* Display Area */}
                {loading ? (
                    <Loader />
                ) : (
                    <ul className="w-11/12 max-w-md mt-10">
                        {todoList ? (
                            Object.entries(todoList).map(
                                ([key, value], index) => {
                                    // TODO: 各TODOに機能を持たせる
                                    return (
                                        <li
                                            key={index}
                                            className="w-full flex items-center mb-4"
                                        >
                                            <button
                                                type="button"
                                                className={`${'w-8 h-8 rounded-full text-xl font-bold'} ${
                                                    value.isDone ||
                                                    'border-2 border-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                                } ${
                                                    value.isDone &&
                                                    'text-neutral-900 bg-yellow-500'
                                                }`}
                                                onClick={() =>
                                                    handleClick(
                                                        key,
                                                        value.isDone
                                                    )
                                                }
                                            >
                                                {value.isDone && '\u2713'}
                                            </button>
                                            <span
                                                className={`${'ml-4 text-2xl font-medium text-neutral-900 dark:text-neutral-300'} ${
                                                    value.isDone &&
                                                    'text-neutral-500 dark:text-neutral-500'
                                                }`}
                                            >
                                                {value.title}
                                            </span>
                                            <button
                                                type="button"
                                                className="text-md text-neutral-500 hover:text-yellow-500 ml-4"
                                                onClick={() => removeTodo(key)}
                                            >
                                                delete
                                            </button>
                                        </li>
                                    );
                                }
                            )
                        ) : (
                            <p className="w-full flex justify-center text-neutral-500 dark:text-neutral-500">
                                TODOはありません。
                            </p>
                        )}
                    </ul>
                )}
            </main>

            <Footer />
        </div>
    );
}
