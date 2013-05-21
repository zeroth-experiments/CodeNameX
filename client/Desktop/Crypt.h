/* ============================================================
 *
 * This file is a part of CodeNameX project
 * http://thezeroth.net
 *
 * Date        : 20-05-2013
 * Description : Cryptography functions.
 *
 * Copyright (C) 2013      by Abhishek patil <abhishek@thezeroth.net>
 *
 * This program is free software; you can redistribute it
 * and/or modify it under the terms of the GNU General
 * Public License as published by the Free Software Foundation;
 * either version 2, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * ============================================================ */

struct CryptData;
class Crypt 
{
public:
    Crypt();
    ~Crypt();

private:
    CryptData* d;
};

